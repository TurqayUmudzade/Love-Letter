using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Love_Letter.Models
{
    public class Lobby
    {


        [Key]
        public int LobbyID { get; set; }

        public int numberOfPlayers { get; set; }

        public int Space { get; set; }

        public bool Private { get; set; }

        [MaxLength(12)]
        public string Password { get; set; }

        public string user1 { get; set; }

        public string user2 { get; set; }

        public string user3 { get; set; }

        public string user4 { get; set; }

        public Lobby(int space)
        {
            Space = space;
            numberOfPlayers = 0;
        }
    }
}
