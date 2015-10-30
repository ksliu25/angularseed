(function(){
	'use strict';

	angular
		.module('myApp')
		.controller('LotteryDetailsController', LotteryDetailsController);

		LotteryDetailsController.$inject = ['TicketsService','LeaguesService','LotteriesService', 'FlashService', '$stateParams', '$location'];
		function LotteryDetailsController(TicketsService, LeaguesService, LotteriesService, FlashService, $stateParams, $location){
			var vm = this;

			vm.buyTicket = buyTicket;
			vm.selectedLottery;
			vm.lotteryTickets;
			lotteryShow($stateParams.leagueId, $stateParams.lotteryId);
			getTickets($stateParams.leagueId, $stateParams.lotteryId);


			function lotteryShow(leagueId, lotteryId){
				LotteriesService.LotteriesShow(leagueId, lotteryId, function(response){
					vm.selectedLottery = response.data;
				});
			}

			function buyTicket(leagueId, lotteryId, bowlerId, bowlerName){
				TicketsService.TicketLotteryBuy(leagueId, lotteryId, bowlerId, function(response){
					if (response.status === 200){
						FlashService.Success('Ticket bought for '+ bowlerName +'!', true);
						getTickets(leagueId, lotteryId)
					}
				});
			}

			function getTickets(leagueId, lotteryId){
				TicketsService.Tickets(leagueId, lotteryId, function(response){
					vm.lotteryTickets = response.data;
				});
			}

		}

})();