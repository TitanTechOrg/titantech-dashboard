import { useLocation } from 'react-router-dom';

export function FourOhFour() {
    let location = useLocation();

    return (
        <div>
            <h3>
                Oops, couldn't find page <code>{location.pathname}</code>.
            </h3>
        </div>
    );
}
