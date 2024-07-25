import React, { useEffect, useState } from 'react'
import { StudentData } from './StudentData'
import { Table, Button } from 'react-bootstrap';
const App = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [lname, setLname] = useState('');
  const [rollno, setRollno] = useState('');
  const [isUpdate, setisUpdate] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    setData(StudentData);
  }, []); // Empty dependency array to run only once on mount

  const handleSave = (name, lname, rollno) => {
    const newdata = {
      id: data.length + 1,
      FirstName: name,
      LastName: lname,
      Rollno: (rollno)
    };
    setData([...data, newdata]) // Correctly updating the state
    console.log([...data, newdata]);
  }

  const handleDelete = (item, index) => {
    confirm('Are you sure to delete this item');
    setData(data.filter((d) => {
      return d.id != item.id
    }))
  }

  const handleEdit = (detail, index) => {
    alert('edit clicked')
    console.log(detail, index);
    setName(detail.FirstName);
    setLname(detail.LastName);
    setRollno(detail.Rollno);
    setisUpdate(true);
    setCurrentItem(detail);
    ;
  }

  const handleUpdate = (datas) => {
    console.log(datas)
    const updatedData = datas.map((d) =>
      d.id == currentItem.id ? { ...d, FirstName: name, LastName: lname, Rollno: rollno }:d
  );
  setData(updatedData);
  setisUpdate(false);
  handleClear();
}







  const handleClear = () => {
    setName('');
    setLname('');
    setRollno('');
  }
  return (
    <>

      <div className='container d-flex justify-content-center'>
        <div className='form mt-5 mb-5 '>
          <label htmlFor="fname" className='ms-2'>FirstName</label>
          <input type="text" id="fname" className='ms-2' value={name} onChange={(e) => { setName(e.target.value) }} />
          <label htmlFor="lname" className='ms-2'>LastName</label>
          <input type="text" id="lname" className='ms-2' value={lname} onChange={(e) => { setLname(e.target.value) }} />
          <label htmlFor="Rno" className='ms-2'>Rollno</label>
          <input type="text" id="Rno" className='ms-2' value={rollno} onChange={(e) => { setRollno(e.target.value) }} />
        </div>
        <div>
          {(!isUpdate) ? <Button className='btn-primary ms-3 mt-5' onClick={() => { handleSave(name, lname, rollno) }}>Save</Button>
            :
            <Button className='btn-primary ms-3 mt-5' onClick={() => { handleUpdate(data) }}>Update</Button>
          }


          <Button className='btn-danger ms-3 mt-5' onClick={() => { handleClear() }}>Clear</Button>
        </div>
      </div>
      <div>
        <Table striped bordered hover >
          <thead >
            <tr>
              <th>S.NO</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>RollNo</th>
              <th>Action</th>
            </tr>
          </thead>
          {data.map((detail, index) => {
            return (
              <tbody key={index}>
                <tr>
                  <td>{detail.id}</td>
                  <td>{detail.FirstName}</td>
                  <td>{detail.LastName}</td>
                  <td>{detail.Rollno}</td>
                  <td>
                    <Button className='btn-primary' onClick={() => { handleEdit(detail, index) }}>Edit</Button>
                    <Button className='btn-danger ms-3' onClick={() => handleDelete(detail, index)}>Delete</Button>
                  </td>
                </tr>
              </tbody>
            )
          })}
        </Table>
      </div>

    </>
  )
}
export default App;