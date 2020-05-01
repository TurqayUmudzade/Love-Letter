using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Diagnostics;
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

        public async Task GiveFirstCards(int[] a, string lobbyID)
        {
            await Clients.Group(lobbyID).SendAsync("GiveCards", a);
        }

        public async Task Play( string lobbyID)
        {
            await Clients.Group(lobbyID).SendAsync("MyTurn");
        }
        public async Task CardPlayed(string thiscard, string lobbyID)
        {
            await Clients.OthersInGroup(lobbyID).SendAsync("CardMoved", Context.User.Identity.Name, thiscard);
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
