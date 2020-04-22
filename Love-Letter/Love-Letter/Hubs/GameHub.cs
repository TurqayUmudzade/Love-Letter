using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace Love_Letter.Hubs
{
    public class GameHub:Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
        public async Task MoveCard(string id)
        {
            await Clients.All.SendAsync("CardMoved",id);
        }
    }
}
