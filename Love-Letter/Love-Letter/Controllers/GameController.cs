using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Love_Letter.Data;
using Love_Letter.Models;
using Microsoft.AspNetCore.Mvc;
using Love_Letter.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Love_Letter.Hubs;

namespace Love_Letter.Controllers
{
    public class GameController : Controller
    {
        private readonly Context _context;
        private readonly IHubContext<GameHub> _hubContext;

        public GameController(Context context, IHubContext<GameHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;

        }
        public IActionResult Index()
        {
            LobbiesViewModel model = new LobbiesViewModel()
            {
                Lobbies = _context.Lobbies.ToList()
            };

            return View(model);
        }

        [HttpPost]
        public IActionResult JoinLobby(string username, string LobbyID)
        {
            Lobby lobby = _context.Lobbies.Find(Int32.Parse(LobbyID));

            if (String.IsNullOrEmpty(lobby.user1))
                lobby.user1 = username;
            else if (String.IsNullOrEmpty(lobby.user2))
                lobby.user2 = username;
            else if (String.IsNullOrEmpty(lobby.user3))
                lobby.user3 = username;
            else if (String.IsNullOrEmpty(lobby.user4))
                lobby.user4 = username;
            else
                return Content("LobbyFull");


            _context.SaveChanges();

            WaitViewModel model = new WaitViewModel()
            {
                myUsername = username,
                Lobby = lobby
            };

            return View("Waitting", model);
        }

        public IActionResult Waitting()
        {

            return View();
        }
        

        [Authorize]
        public IActionResult Lobby(int lobbyID)
        {
            string username = User.Identity.Name;

            Lobby lobby = _context.Lobbies.Find(lobbyID);

            if (String.IsNullOrEmpty(lobby.user1))
                lobby.user1 = username;
            else if (String.IsNullOrEmpty(lobby.user2))
                lobby.user2 = username;
            else if (String.IsNullOrEmpty(lobby.user3))
                lobby.user3 = username;
            else if (String.IsNullOrEmpty(lobby.user4))
                lobby.user4 = username;
            else
                return Content("LobbyFull");

            LobbiesViewModel model = new LobbiesViewModel()
            {
                username = username,
                Lobby = lobby
            };

            return View(model);
        }
    }
}