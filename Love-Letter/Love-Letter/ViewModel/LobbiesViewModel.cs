using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Love_Letter.Models;

namespace Love_Letter.ViewModel
{
    public class LobbiesViewModel
    {

        public List<Lobby> Lobbies { get; set; }

        public Lobby Lobby { get; set; }

        public string username { get; set; }
    }
}
