import { Join } from "../components/CreateButton";

export const Home = () => {
    return (
        <div className="App">
            <header className="App-header">
            <div className="container">
                <div className="row">
                    <Join />
                </div>
                <div className="row">
                    <Join roomId={1} />
                    <Join roomId={2} />
                    <Join roomId={3} />
                    <Join roomId={4} />
                </div>

            </div>
            </header>
        </div>
    );
};
