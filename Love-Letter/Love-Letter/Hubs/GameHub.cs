using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Diagnostics;
using System.Threading.Tasks;

namespace Love_Letter.Hubs
{
    public class GameHub : Hub
    {
       
        public Task JoinLobby(string lobbyID)
        {
            return Groups.AddToGroupAsync(Context.ConnectionId, lobbyID);
        }

        public Task LeaveLobby(string roomName)
        {
            return Groups.RemoveFromGroupAsync(Context.ConnectionId, roomName);
        }

        public async Task MoveLobbyCard(string id, string lobbyID)
        {
            await Clients.Group(lobbyID).SendAsync("CardMoved", id);
        }

        public async Task GiveFirstCards(int[] a)
        {
            await Clients.All.SendAsync("GiveCards",a);
        }

        [Authorize]
        public override async Task OnConnectedAsync()
        {
           //remove comment when finished
            // await Clients.All.SendAsync("UserDisconnected", Context.User.Identity.Name);
            //await Clients.All.SendAsync("UserConnected", Context.ConnectionId);
            await Clients.Others.SendAsync("UserConnected", Context.ConnectionId);
            await Clients.All.SendAsync("GameStart");
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
