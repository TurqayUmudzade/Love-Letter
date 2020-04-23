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

        [Authorize]
        public IActionResult Lobby(int lobbyID)
        {
            //_hubContext.Groups.AddToGroupAsync(Context.ConnectionId, lobbyname);
            LobbiesViewModel model = new LobbiesViewModel()
            {
                Lobby = _context.Lobbies.Find(lobbyID)
            };

            return View(model);
        }
    }
}