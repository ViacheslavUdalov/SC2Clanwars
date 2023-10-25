using Microsoft.AspNetCore.SignalR;
using SC2Clanwars.DbContextModels;
using SC2Clanwars.SignalRModel;

namespace SC2Clanwars.Hubs;

public class ChatHub : Hub
{
    private readonly Dictionary<string, UserRoomConnection> _connections;

    public ChatHub(Dictionary<string, UserRoomConnection> connections)
    {
        _connections = connections;
    }

    public async Task JoinRoom(UserRoomConnection userConnection)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room!);
        _connections[Context.ConnectionId] = userConnection;
        await Clients.Groups(userConnection.Room!)
            .SendAsync("ReceiveMessage", "Let's Program", $"{userConnection.User} has joined the Group", DateTime.Now);
        await SendConnectedUser(userConnection.Room!);
    }

    public async Task SendMessage(string message)
    {
        if (_connections.TryGetValue(Context.ConnectionId, out UserRoomConnection roomConnection))
        {
            await Clients.Groups(roomConnection.Room!)
                .SendAsync("ReceiveMessage", roomConnection.User, message, DateTime.Now);
        }
    }

    public override Task OnDisconnectedAsync(Exception? exp)
    {
        if (!_connections.TryGetValue(Context.ConnectionId, out UserRoomConnection roomConnection))
        {
            return base.OnDisconnectedAsync(exp);
        }

        Clients.Groups(roomConnection.Room!)
            .SendAsync("ReceiveMessage", "let's Program", $"{roomConnection.User} has left the Group", DateTime.Now);
        SendConnectedUser(roomConnection.Room!);
        return base.OnDisconnectedAsync(exp);
    }

    public Task SendConnectedUser(string room)
    {
        var users = _connections.Values
            .Where(u => u.Room == room)
            .Select(s => s.User);
        return Clients.Groups(room).SendAsync("ConnectedUser", users);
    }
}