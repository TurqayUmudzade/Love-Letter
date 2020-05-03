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

        public async Task JoinLobby(string lobbyID)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, lobbyID);
            Debug.WriteLine("on join lobby " + Context.ConnectionId);
            await Clients.OthersInGroup(lobbyID).SendAsync("JoinedLobby", Context.ConnectionId);
            await Clients.Group(lobbyID).SendAsync("GameStart");

        }

        public async Task SendEnemylist( string lobbyID,string[] enemies)
        {
            await Clients.Group(lobbyID).SendAsync("RecievEnemyList",enemies);
        }

        public async Task GiveFirstCards(int[] a, string lobbyID)
        {
            await Clients.Group(lobbyID).SendAsync("GiveCards", a);
        }

        public async Task Play( string lobbyID)
        {
            await Clients.Group(lobbyID).SendAsync("MyTurn");
        }
        public async Task CardPlayed(string lobbyID,string card,string toWhom,string byWho)
        {
            await Clients.OthersInGroup(lobbyID).SendAsync("CardMoved", card,toWhom,byWho);
            await Clients.Caller.SendAsync("CardPower",card,toWhom,byWho);
        }

        //CARDS

        public async Task Baron(string lobbyID, string card, string toWhom, string byWho)
        {
            await Clients.Group(lobbyID).SendAsync("Baron", card, toWhom, byWho);
        }


        public async Task Result(string lobbyID, string result,string loser)
        {
            await Clients.Group(lobbyID).SendAsync("Result", result,loser);
        }

        public async Task GameOver(string lobbyID)
        {
            await Clients.Group(lobbyID).SendAsync("GameOver");
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
