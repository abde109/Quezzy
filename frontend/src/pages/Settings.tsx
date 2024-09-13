import { useEffect, useState } from 'react';
import { getSettings, updateSettings } from '../api/setting';
import { IUser } from '../types/userType';


const Setting = () => { 
      const [settings, setSettings] = useState<IUser | null>(null); 
      useEffect(() => {
            const fetchSettings = async () => {
                  
                 console.log("fetching settings");
                  
                  try {
                        const settings = await getSettings();
                        setSettings(settings.user);
                    console.log(settings.user);
                        
                  } catch (err) {
                        console.error(err);
                  }
            }
            fetchSettings();
            
      }, [])
      

      const handleSave = () => {
            console.log("saving settings", settings);
            updateSettings(settings);
            
      }
      return (
            <div>
                  <input name="myInput"
                        className='border-2 border-gray-500 rounded-lg px-6'
                        value={settings && settings.email !== undefined ? settings.email : ''}
                        onChange={(e) => setSettings({ ...settings! , email: e.target.value })} />
                        
                                    <input name="myInput"
                        className='border-2 border-gray-500 rounded-lg px-6'
                        value={settings && settings.email !== undefined ? settings.username : ''}
                        onChange={(e) => setSettings({ ...settings! , username: e.target.value })} />
                  
                      
                  <button onClick={handleSave}>update</button>
                  {/* <h1>{settings && settings.email }</h1>
                  <h1>{settings && settings.username}</h1>
                  <h1>{settings && settings.role}</h1> */}
                  
                  

      </div>
      )
};

export default Setting;