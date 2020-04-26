using Love_Letter.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Love_Letter.ViewModel
{
    public class WaitViewModel
    {
        public List<String> OpponentNames { get; set; }
        public string myUsername { get; set; }

        public Lobby Lobby { get; set; }
    }
}
