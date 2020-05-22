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
After that, double click the attached script file to set up the databases. Then by using this command you can start the app:
	
	dotnet run

To connect to the game, copy the first localhost link and open it, and finally you are in the game