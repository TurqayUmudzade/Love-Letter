using Microsoft.EntityFrameworkCore.Migrations;

namespace Love_Letter.Migrations
{
    public partial class lobby2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lobbies_users_user1UserID",
                table: "Lobbies");

            migrationBuilder.DropForeignKey(
                name: "FK_Lobbies_users_user2UserID",
                table: "Lobbies");

            migrationBuilder.DropForeignKey(
                name: "FK_Lobbies_users_user3UserID",
                table: "Lobbies");

            migrationBuilder.DropForeignKey(
                name: "FK_Lobbies_users_user4UserID",
                table: "Lobbies");

            migrationBuilder.DropIndex(
                name: "IX_Lobbies_user1UserID",
                table: "Lobbies");

            migrationBuilder.DropIndex(
                name: "IX_Lobbies_user2UserID",
                table: "Lobbies");

            migrationBuilder.DropIndex(
                name: "IX_Lobbies_user3UserID",
                table: "Lobbies");

            migrationBuilder.DropIndex(
                name: "IX_Lobbies_user4UserID",
                table: "Lobbies");

            migrationBuilder.DropColumn(
                name: "user1UserID",
                table: "Lobbies");

            migrationBuilder.DropColumn(
                name: "user2UserID",
                table: "Lobbies");

            migrationBuilder.DropColumn(
                name: "user3UserID",
                table: "Lobbies");

            migrationBuilder.DropColumn(
                name: "user4UserID",
                table: "Lobbies");

            migrationBuilder.AddColumn<string>(
                name: "user1",
                table: "Lobbies",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "user2",
                table: "Lobbies",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "user3",
                table: "Lobbies",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "user4",
                table: "Lobbies",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "user1",
                table: "Lobbies");

            migrationBuilder.DropColumn(
                name: "user2",
                table: "Lobbies");

            migrationBuilder.DropColumn(
                name: "user3",
                table: "Lobbies");

            migrationBuilder.DropColumn(
                name: "user4",
                table: "Lobbies");

            migrationBuilder.AddColumn<int>(
                name: "user1UserID",
                table: "Lobbies",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "user2UserID",
                table: "Lobbies",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "user3UserID",
                table: "Lobbies",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "user4UserID",
                table: "Lobbies",
                type: "int",
                nullable: true);

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

            migrationBuilder.AddForeignKey(
                name: "FK_Lobbies_users_user1UserID",
                table: "Lobbies",
                column: "user1UserID",
                principalTable: "users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Lobbies_users_user2UserID",
                table: "Lobbies",
                column: "user2UserID",
                principalTable: "users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Lobbies_users_user3UserID",
                table: "Lobbies",
                column: "user3UserID",
                principalTable: "users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Lobbies_users_user4UserID",
                table: "Lobbies",
                column: "user4UserID",
                principalTable: "users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
