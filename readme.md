# Notes

## Filewatcher in React project
Watching files does not work in a container out of the box. (Maybe becuse the docker host is WSL2?) Webpack can poll for changes instead. Create a <code>.env</code> file and add <b>WATCHPACK_POLLING=true</b> to enable polling.

## Access webapi from container in the sam docker network

To be able to accesss the webapi from a container on the same network the webapi has to listen to all hosts. In launch.json change localhost:5000 to
<code>"ASPNETCORE_URLS": "https://*:5000"</code>.
Using this config tells ASPNET to listen to all hosts, e.g. eth0(whick seems to be used for the docker network).

## Use a development cert

To use https a cert has to be provided to ASPNET. It's best to create a development cert locally and provide it to the container. It can be provided by mounting a volume containing a .pfx file.

First create the cert locally.

<code>

dotnet dev-certs https -ep %USERPROFILE%\.aspnet\https\webapi.pfx -p kalle

dotnet dev-certs https --trust

</code>

Then mount the folder in the compose file.

<code>
    
    volumes:
      - ~/.aspnet/https:/https:ro
</code>

The last thing to do is to provide location and the password, "kalle", to ASPNET. It can be provided by setting enviironment varianbles in the compose file.

<code>

    environment:
      - ASPNETCORE_Kestrel__Certificates__Default__Password=kalle
      - ASPNETCORE_Kestrel__Certificates__Default__Path=/https/webapi.pfx
</code>
