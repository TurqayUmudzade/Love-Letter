# Love-Letter
Project for software engineering
How to run

First, Download and run these files:

_____________________________________________________________________________________________________

https://dotnet.microsoft.com/download/dotnet-core/3.1 (3.1.0 version)

https://www.microsoft.com/en-us/sql-server/sql-server-downloads 

https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15

_____________________________________________________________________________________________________

Then, clone the repositary using the following command, 

	git clone https://github.com/TurqayUmudzade/Love-Letter/

Open SQL Server Configuration and connect now.
After that, go into Microsoft SQL Server Management Studio and from drop-down menu choose a server name, the latest one, connect and copy this name. Then in the source code, go to appsetting.Development.json file and change Server name to the one that you just copied.
After that, double click the attached script file and run it  to set up the databases. Then by using this command you can start the app:(inside the folder that has .csproject)
	
	dotnet run


1)connect to the first localhost link
2)Register(logs you in automaticly)
3)Go to Lobbies tab on nav bar
4)Create a Lobby and Join!

NOTES:We made the lobby with connection IDS instead of user name because than for testing you would have to login from 4 different browsers instead of opening 4 tabs;
The Game file is mainly:
https://github.com/TurqayUmudzade/Love-Letter/blob/master/Love-Letter/Love-Letter/wwwroot/lib/signalr/game.js

if someone wants to host this and use the login system they should just change CTRL+F and replace every "Context.ConnectionId" with "Context.User.Identity.Name" inside the Hub/GameHub.cs file