import {useEffect, useState} from 'react';
import {Pencil, Trash} from 'react-bootstrap-icons';
import {deleteTrip, getAllTrips} from '../../../api/trip';
import {ConfirmDialog} from '../../../components/common/ConfirmDialog';
import {Notification} from '../../../components/common/Notificacion';
import {Table} from '../../../components/common/Table';
import history from '../../../utils/history';


const columns = [{id: 'id', label: 'id'}, {id: 'name', label: 'Nombre'}, {
  id: 'duration',
  label: 'Duración'
}, {id: 'release_date', label: 'Fecha de estreno'}, {id: 'description', label: 'Description'}, {
  id: 'status_id',
  label: 'Estado'
},];

const handleClickDelete = async ({
  id, trips, setTrips, setNotify, setConfirmDialog, confirmDialog,
}) => {
  try {
    await deleteTrip(id);
    const newMovies = trips.filter((trips) => trips.id !== id);
    setTrips(newMovies);
    setConfirmDialog({
      ...confirmDialog, isOpen: false,
    });
    setNotify({
      isOpen: true, message: 'Se ha eliminado correctamente', type: 'success',
    });
  } catch (error) {
    console.error(error);
  }
};
const handleClickLock = (id) => {
  console.log(id);
};

const handleClickEdit = (id) => {
  history.push({
    pathname: '/dashboard/destino/editar', state: {id},
  });
};


const TripTable = () => {
  const [trips, setTrips] = useState([]);
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''});
  const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: ''});

  const actions = ({id}) => (<div>
      <Pencil
        style={{
          cursor: 'pointer', color: 'green', width: '30px'
        }}
        onClick={() => handleClickEdit(id)} />
      <Trash
        style={{
          cursor: 'pointer', color: 'red', width: '30px'
        }}
        onClick={() => {
          setConfirmDialog({
            isOpen: true,
            title: '¿Estás seguro que deseas eliminar este destino?',
            subTitle: 'No puedes deshacer está acción!',
            onConfirm: () => handleClickDelete({
              id: id, trips, setTrips, setNotify, setConfirmDialog, confirmDialog,
            }),
          });
        }}
      />
    </div>);

  useEffect(() => {
    async function fetchData() {
      if (!trips.length) {
        const response = await getAllTrips();
        setTrips(response.data.data);
      }
    }

    fetchData();
  }, []);

  return (<>
      <Table
        columns={columns}
        rows={trips}
        actions={actions}
        title={'Destinos'}
        link={'/dashboard/destino/agregar'}
      />
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </>);
};

export default TripTable;
