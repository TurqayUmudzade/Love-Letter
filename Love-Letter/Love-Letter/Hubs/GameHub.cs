using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace Love_Letter.Hubs
{
    public class GameHub : Hub
    {

        //START BASICS
        public async Task JoinLobby(string lobbyID)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, lobbyID);
            Debug.WriteLine("on join lobby " + Context.ConnectionId);
            await Clients.OthersInGroup(lobbyID).SendAsync("JoinedLobby", Context.ConnectionId);
            await Clients.Group(lobbyID).SendAsync("GameStart");

        }

        public async Task SendEnemylist(string lobbyID, string[] enemies)
        {
            await Clients.Group(lobbyID).SendAsync("RecievEnemyList", enemies);
        }

        public async Task GiveFirstCards(int[] a, string lobbyID)
        {
            await Clients.Group(lobbyID).SendAsync("GiveCards", a);
        }

        public async Task CardPower(string lobbyID, string card, string toWhom, string byWho, int mycard)
        {
            await Clients.Caller.SendAsync("CardPower", card, toWhom, byWho, mycard);

        }

        public async Task CardMoved(string lobbyID, string card, string byWho)
        {
            await Clients.OthersInGroup(lobbyID).SendAsync("CardMoved", card, byWho);

        }



        //CARDS
        public async Task Guard(string lobbyID, string toWhom, string byWho, string guess)
        {
            Debug.WriteLine("Guard");
            await Clients.Group(lobbyID).SendAsync("Guard", toWhom, byWho, guess);
        }
        public async Task Priest(string lobbyID, string card, string toWhom, string byWho, int attackercard)
        {
            await Clients.Group(lobbyID).SendAsync("Priest", card, toWhom, byWho, attackercard);
        }
        public async Task PriestShowCard(string lobbyID, int card, string attacker, string text)
        {
            await Clients.Group(lobbyID).SendAsync("PriestShowCard", card, attacker, text);
        }

        public async Task Baron(string lobbyID, string card, string toWhom, string byWho, int attackercard)
        {
            await Clients.Group(lobbyID).SendAsync("Baron", card, toWhom, byWho, attackercard);
        }
        public async Task Handmaid(string lobbyID, string byWho)
        {
            Debug.WriteLine("Handmaid");
            await Clients.Group(lobbyID).SendAsync("Handmaid", byWho);
        }
        public async Task RemoveProtection(string lobbyID, string user)
        {
            await Clients.OthersInGroup(lobbyID).SendAsync("RemoveProtection", user);
        }


        public async Task Prince(string lobbyID, string card, string toWhom, string byWho)
        {
            Debug.WriteLine("Prince");
            await Clients.Group(lobbyID).SendAsync("Prince", card, toWhom, byWho);
        }
        public async Task King(string lobbyID, string card, string toWhom, string byWho, int attackercard)
        {
            Debug.WriteLine("King");
            await Clients.Group(lobbyID).SendAsync("King", card, toWhom, byWho, attackercard);
        }

        public async Task ResultKing(string lobbyID, string result, string loser, int returnCard)
        {
            await Clients.Group(lobbyID).SendAsync("ResultKing", result, loser, returnCard);
        }

        public async Task Princess(string lobbyID, string card, string toWhom, string byWho, int attackercard)
        {
            Debug.WriteLine("Princess");
            await Clients.Group(lobbyID).SendAsync("Princess", card, toWhom, byWho, attackercard);
        }

        //CARDS END


        public async Task Result(string lobbyID, string result, string loser, int attackCard)
        {
            await Clients.Group(lobbyID).SendAsync("Result", result, loser, attackCard);
        }

        public async Task Next(string lobbyID)
        {
            await Clients.Group(lobbyID).SendAsync("Next");
        }

        public async Task shiftdeck(string lobbyID)
        {
            await Clients.Group(lobbyID).SendAsync("shiftdeck");
        }

        public async Task Unshift(string lobbyID)
        {
            await Clients.OthersInGroup(lobbyID).SendAsync("Unshift");
        }


        public async Task GameOver(string lobbyID)
        {
            await Clients.Group(lobbyID).SendAsync("GameOver");
        }

        public async Task RoundWinner(string lobbyID, int card, int order,string winner)
        {
            await Clients.Group(lobbyID).SendAsync("RoundWinner", card, order,winner);
        }


        //FOR later
        public Task LeaveLobby(string roomName)
        {
            return Groups.RemoveFromGroupAsync(Context.ConnectionId, roomName);
        }


        [Authorize]
        public override async Task OnConnectedAsync()
        {
            //remove comment when finished
            // await Clients.Caller.SendAsync("UserDisconnected", Context.User.Identity.Name);
            Debug.WriteLine("on connect " + Context.ConnectionId);
            await Clients.Caller.SendAsync("UserConnected", Context.ConnectionId);
            await base.OnConnectedAsync();

        }
        public override async Task OnDisconnectedAsync(Exception ex)
        {
            //remove comment when finished
            // await Clients.All.SendAsync("UserDisconnected", Context.User.Identity.Name);
            await Clients.All.SendAsync("UserDisconnected", Context.ConnectionId);
            await base.OnDisconnectedAsync(ex);
        }
    }
}
