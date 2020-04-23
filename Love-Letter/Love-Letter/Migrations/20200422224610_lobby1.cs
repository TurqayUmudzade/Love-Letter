using Microsoft.EntityFrameworkCore.Migrations;

namespace Love_Letter.Migrations
{
    public partial class lobby1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Lobbies",
                columns: table => new
                {
                    LobbyID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    numberOfPlayers = table.Column<int>(nullable: false),
                    Space = table.Column<int>(nullable: false),
                    Private = table.Column<bool>(nullable: false),
                    Password = table.Column<string>(maxLength: 12, nullable: true),
                    user1UserID = table.Column<int>(nullable: true),
                    user2UserID = table.Column<int>(nullable: true),
                    user3UserID = table.Column<int>(nullable: true),
                    user4UserID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lobbies", x => x.LobbyID);
                    table.ForeignKey(
                        name: "FK_Lobbies_users_user1UserID",
                        column: x => x.user1UserID,
                        principalTable: "users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Lobbies_users_user2UserID",
                        column: x => x.user2UserID,
                        principalTable: "users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Lobbies_users_user3UserID",
                        column: x => x.user3UserID,
                        principalTable: "users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Lobbies_users_user4UserID",
                        column: x => x.user4UserID,
                        principalTable: "users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Lobbies_user1UserID",
                table: "Lobbies",
                column: "user1UserID");

            migrationBuilder.CreateIndex(
                name: "IX_Lobbies_user2UserID",
                table: "Lobbies",
                column: "user2UserID");

            migrationBuilder.CreateIndex(
                name: "IX_Lobbies_user3UserID",
                table: "Lobbies",
                column: "user3UserID");

            migrationBuilder.CreateIndex(
                name: "IX_Lobbies_user4UserID",
                table: "Lobbies",
                column: "user4UserID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Lobbies");
        }
    }
}
