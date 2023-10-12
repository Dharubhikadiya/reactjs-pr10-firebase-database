import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db } from './firebase';
import { addDoc, collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

function App() {

  const tbl = collection(db, "users");
  const [record, setRecord] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [editid, setEditid] = useState("");

  const getuser = async () => {
    const data = await getDocs(tbl);
    let ans = data.docs.map((val) => {
      return ({ ...val.data(), id: val.id })
    })
    setRecord(ans);
  }

  const handlesubmit = async () => {
    console.log(name);
    console.log(phone);
    let insert = await addDoc(tbl, { name: name, phone: phone });
    if (insert) {
      alert("insert")
    } else {
      alert("not insert");
    }
    setName("");
    setPhone("");
    getuser();
  }

  const deletedata = async (id) => {
    const userDoc = doc(db, "users", id);
    let res = await deleteDoc(userDoc);
    alert("delete");
    getuser();
  }

  const editdata = (id, name, phone) => {
    setName(name)
    setPhone(phone)
    setEditid(id)
  }

  const handleUpdate = async () => {
    const userDoc = doc(db, "users", editid);
    const newFields = { name: name, phone: phone };
    await updateDoc(userDoc, newFields);
    alert("update");
    setEditid("");
    setName("");
    setPhone("");
    getuser();
  }

  const clear = async() => {
    const querySnapshot = await getDocs(tbl);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
    alert('All records cleared');
    getuser();
  };

  useEffect(() => {
    getuser();
  }, [])

  return (
    <div className="App">
      <h1 className='py-4 mb-5 fw-bold'>Todo List</h1>
      <center>
        <table>
          <thead>
            <tr className='border-1 mt-4'>
              <td><input className='border-0 ps-3' type='text' placeholder='Add a Todo...' name='name' onChange={(e) => setName(e.target.value)} value={name}></input>
                {
                  editid ? (<button className='bg-secondary text-white py-2 px-3 border-0' onClick={() => handleUpdate()}>edit</button>) : (<button className='button-hover bg-secondary text-white py-2 px-3 border-0' onClick={() => handlesubmit()}>submit</button>)
                }
              </td>
            </tr>
          </thead>
        </table>
        <table className='bg-light p-5 m-5 w-50 rounded-4 d-flex align-items-center justify-content-center'>
          <tbody className=''>
            {
              record.map((val) => {
                return (
                  <tr key={val.name}>
                    <td className='pe-5 fw-bold fs-5'>{val.name}</td>
                    <td>
                      <button className='text-white bg-danger border-0 ms-5 py-2 px-3 rounded me-2 m-2' onClick={() => deletedata(val.id)}>Remove</button>
                      <button className='text-white bg-secondary border-0 py-2 px-3 rounded me-2 m-2' onClick={() => editdata(val.id, val.name, val.phone)}>edit</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <button className='text-white bg-danger border-0 ms-5 py-2 px-3 rounded me-2 m-2' 
        onClick={()=>clear()}>Clear List</button>
      </center>
    </div>
  );
}
export default App;