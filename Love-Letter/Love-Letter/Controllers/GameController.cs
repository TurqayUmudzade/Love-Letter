using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Love_Letter.Data;
using Love_Letter.Models;
using Microsoft.AspNetCore.Mvc;
using Love_Letter.ViewModel;


namespace Love_Letter.Controllers
{
    public class GameController : Controller
    {
        private readonly Context _context;

        public GameController(Context context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            LobbiesViewModel model = new LobbiesViewModel()
            {
                Lobbies = _context.Lobbies.ToList()
            };

            return View(model);
        }

        public IActionResult Lobby(int lobbyID)
        {
            LobbiesViewModel model = new LobbiesViewModel()
            {
                Lobby = _context.Lobbies.Find(lobbyID)
            };

            return View(model);
        }
    }
}