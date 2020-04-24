using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Diagnostics;
using System.Threading.Tasks;

namespace Love_Letter.Hubs
{
    public class GameHub : Hub
    {
        

        public async Task MoveCard(string id)
        {
            await Clients.All.SendAsync("CardMoved", id);
        }

        
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

        [Authorize]
        public override async Task OnConnectedAsync()
        {
            await Clients.All.SendAsync("UserConnected", Context.User.Identity.Name);
            await base.OnConnectedAsync();

        }
        public override async Task OnDisconnectedAsync(Exception ex)
        {
            await Clients.All.SendAsync("UserDisconnected", Context.User.Identity.Name);
            await base.OnDisconnectedAsync(ex);
        }
    }
}
