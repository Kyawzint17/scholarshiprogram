import { useState , useEffect } from "react";

function YourComponent() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/api/scholarshipWork')
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            {data.map((item) => (
                <div key={item.id}>{item.work}</div>
            ))}
        </div>
    )
}

export default YourComponent;