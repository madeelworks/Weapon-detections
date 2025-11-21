import React, { useEffect, useState }  from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

function Acknowledge() {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    useEffect(() => {
      const fetchAlerts = async () => {
        try {
          let userID = ""; 
          setLoading(true);
          setErr("");
           const user = await axios.get("http://localhost:3001/user/profile", { withCredentials: true });
          console.log("user", user)
  
           if(!user){
  
            console.log("User Not found")
            return
           }
           userID = user.data._id
  
           console.log("userID", userID)
          const res = await axios.get(`http://localhost:3001/api/detection/${userID}`,  {
            withCredentials: true,
          });
  
          console.log("res", res);
          setAlerts(res.data.data);
        
        } catch (e) {
          setErr("Failed to load alerts. Please try again.", e);
        } finally {
          setLoading(false);
        }
      };
  
      fetchAlerts();
    }, []); 
  


  return (
    <div>
      Acknowledge Threats

      <ul>
        {alerts.map(alert =>(
        <li key={alert._id}>   <div className="flex flex-col items-end gap-2">
          <div style={{color:"red"}} >Already Viewed: {alert.isViewed? "true" : "false" }</div>
                        <Link
                          to={alert.s3_url}
                          target="_blank"
                          className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-500 shadow"
                        >
                          View Image
                        </Link>
                        <button >Iss ko Dubao</button>
                      </div>
                        </li>
        ))}
      </ul>
    </div>
  )
}

export default Acknowledge
