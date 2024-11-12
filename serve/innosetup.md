#define MyAppName "l-asc"
#define MyAppVersion "1.0.0"
#define MyAppPublisher "ARSUD"

[Setup]
AppId={{A86D9276-3863-4929-ADCB-37523C7C3389}}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
DefaultDirName={autopf}\{#MyAppName}
DefaultGroupName={#MyAppName}
DisableProgramGroupPage=yes
PrivilegesRequired=admin
OutputDir=C:\Users\sule\Desktop\lasc
OutputBaseFilename=lasc
SetupIconFile=C:\Users\sule\Desktop\lasc\installer\lasc-icon.ico
Compression=lzma
SolidCompression=yes
WizardStyle=modern

[Languages]
Name: "spanish"; MessagesFile: "compiler:Languages\Spanish.isl"

[Files]
Source: "C:\Users\sule\Desktop\lasc\installer\setup-db.bat"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\Users\sule\Desktop\lasc\installer\start-backend.bat"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\Users\sule\Desktop\lasc\installer\start-nginx.bat"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\Users\sule\Desktop\lasc\installer\backend\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "C:\Users\sule\Desktop\lasc\installer\frontend\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "C:\Users\sule\Desktop\lasc\installer\nginx-1.26.2\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs
; PostgreSQL Installer
Source: "C:\Users\sule\Desktop\lasc\installer\postgresql-16.4-1-windows-x64.exe"; DestDir: "{tmp}"; Flags: ignoreversion
; Script para configurar la base de datos después de la instalación
Source: "C:\Users\sule\Desktop\lasc\installer\setup-db.sql"; DestDir: "{tmp}"; Flags: ignoreversion
Source: "C:\Users\sule\Desktop\lasc\installer\node-v18.20.4-x86.msi"; DestDir: "{tmp}"; Flags: ignoreversion



[Icons]
Name: "{group}\{cm:UninstallProgram,{#MyAppName}}"; Filename: "{uninstallexe}"

[Run]
; Instalar Node.js de forma silenciosa
Filename: "msiexec.exe"; Parameters: "/i ""{tmp}\node-v18.20.4-x86.msi"" /quiet"; StatusMsg: "Instalando Node.js ..."; Check: NeedsNodeInstall
; Instalar PostgreSQL de forma silenciosa
Filename: "{tmp}\postgresql-16.4-1-windows-x64.exe"; Parameters: "--mode unattended --unattendedmodeui none --datadir={app}\pgsql\data --prefix={app}\pgsql --servicename=postgres"; StatusMsg: "Instalando PostgreSQL..."; Flags: waituntilterminated runasoriginaluser
; Ejecutar el resto de scripts

; Crear la base de datos y el usuario una vez instalado PostgreSQL
Filename: "{app}\pgsql\bin\psql.exe"; Parameters: "-U postgres -c ""CREATE DATABASE ilc_db;"""; StatusMsg: "Creando base de datos..."; Flags: runhidden waituntilterminated
Filename: "{app}\pgsql\bin\psql.exe"; Parameters: "-U postgres -c ""CREATE USER postgres WITH PASSWORD 'postgres';"""; StatusMsg: "Creando usuario..."; Flags: runhidden waituntilterminated
Filename: "{app}\pgsql\bin\psql.exe"; Parameters: "-U postgres -d ilc_db -f ""{tmp}\setup-db.sql"""; StatusMsg: "Configurando la base de datos..."; Flags: runhidden waituntilterminated

Filename: "{app}\setup-db.bat"; Description: "Configurar base de datos"; Flags: runminimized
Filename: "{app}\start-backend.bat"; Description: "Iniciar backend"; Flags: runminimized shellexec
Filename: "{app}\start-nginx.bat"; Description: "Iniciar Nginx"; Flags: runminimized shellexec


[Code]
function NeedsNodeInstall(): Boolean;
var
  NodeVersion: String;
begin
  if RegQueryStringValue(HKLM, 'SOFTWARE\Node.js', 'Version', NodeVersion) then
  begin
    if CompareStr(NodeVersion, '18.0.0') >= 0 then
      Result := False
    else
      Result := True;
  end
  else
    Result := True;
end;

[Code]
procedure WaitForPostgres();
var
  ResultCode: Integer;
begin
  repeat
    Exec(ExpandConstant('{app}\pgsql\bin\pg_isready.exe'), '-U postgres', '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
    if ResultCode = 0 then
      Break;
    Sleep(5000);  // Espera 5 segundos antes de volver a intentarlo
  until False;
end;

[Run]
; Llamar al procedimiento después de instalar PostgreSQL
Filename: "{tmp}\postgresql-16.4-1-windows-x64.exe"; Parameters: "--mode unattended --unattendedmodeui none --datadir={app}\pgsql\data --prefix={app}\pgsql --servicename=postgres"; StatusMsg: "Instalando PostgreSQL..."; Flags: waituntilterminated runasoriginaluser; AfterInstall: WaitForPostgres
