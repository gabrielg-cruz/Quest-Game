import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import GamePage from "../GamePage";
import Lobby from "../../components/Lobby/Lobby";
import { useAuth } from "../../contexts/AuthContext";
import styles from './SessionPage.module.scss';
import Header from "../../components/Header/Header";
import { useRoom } from "../../contexts/RoomContext";

export default function SessionPage() {
    const { user, logout } = useAuth();
    const { id: routeId } = useParams<{ id: string }>();
    const {
        ready,
        sessionId,
        players,
        started,
        hostId,
        joinRoom,
        leaveRoom,
        startRoom,
        closeRoom,
        changeVisibility,
    } = useRoom();

    useEffect(() => {
        if (ready && routeId && sessionId !== routeId) {
            console.log("join", routeId);
            joinRoom(routeId);
        }
            
        return () => {
            if (sessionId) leaveRoom();
        };
    }, [ready, routeId, sessionId, joinRoom, leaveRoom]);

    if (!user) return <Navigate to="/" replace />;
    if (!ready) return <p>Connecting to session…</p>;
    if (routeId && !sessionId) return <p>Joining session "{routeId}"…</p>;
    if (!sessionId) return <Navigate to="/" replace />;

    if (!started) {
        return (
            <div className={styles.sessionPage}>
                <Header playerName={user?.name ?? "Jogador"} onLogout={logout} />

                <section className={styles.section}>
                    <Lobby
                        sessionId={sessionId}
                        myPlayerId={user.id}
                        hostId={hostId}
                        players={players}
                        started={started}
                        startRoom={startRoom}
                        changeVisibility={changeVisibility}
                    />
                </section>
            </div>
        );
    }

    return (
        <GamePage 
            sessionId={sessionId} 
            myPlayerId={user.id} 
            players={players} 
            hostId={hostId}
            onFinished={closeRoom}
        />
    );
}
