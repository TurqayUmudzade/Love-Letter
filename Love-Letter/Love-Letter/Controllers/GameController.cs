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
using System.Diagnostics;

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

        public IActionResult CreateLobby (string password,string space)
        {
            Lobby lobby = new Lobby(Int32.Parse(space));
            if (!string.IsNullOrEmpty(password))
            {
                lobby.Password = password;
            }
            _context.Lobbies.Add(lobby);
            _context.SaveChanges();

            return Redirect("/Game");
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

            lobby.numberOfPlayers++;
            _context.SaveChanges();
            LobbiesViewModel model = new LobbiesViewModel()
            {
                username = username,
                Lobby = lobby
            };

            return View(model);
        }
    }
}