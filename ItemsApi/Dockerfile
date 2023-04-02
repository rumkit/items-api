FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime
EXPOSE 80
WORKDIR /app
COPY publish/ ./
ENTRYPOINT ["dotnet", "ItemsApi.dll"]