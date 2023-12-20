import {useEffect, useState} from 'react';
import {Pencil, Trash} from 'react-bootstrap-icons';
import {useHistory} from 'react-router-dom';
import {deleteUser, getAllUsers} from '../../../api/user';
import {ConfirmDialog} from '../../../components/common/ConfirmDialog';
import {Notification} from '../../../components/common/Notificacion';
import {Table} from '../../../components/common/Table';

const columns = [{id: 'id', label: 'ID', minWidth: 170}, {
  id: 'user_name',
  label: 'Nombre de usuario',
  minWidth: 100
}, {id: 'first_name', label: 'Nombre', minWidth: 170}, {
  id: 'last_name',
  label: 'Apellido',
  minWidth: 170
}, {id: 'email', label: 'Email', minWidth: 170}, {id: 'birthday', label: 'Fecha de nac.', minWidth: 100}, {
  id: 'phone',
  label: 'Teléfono',
  minWidth: 60
}, {id: 'sex_id', label: 'Género', minWidth: 50},];

const handleClickDelete = async ({
  id, users, setUsers, setNotify, setConfirmDialog, confirmDialog,
}) => {
  try {
    await deleteUser(id);
    const newUsers = users.filter((users) => users.id !== id);
    setUsers(newUsers);
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


const handleClickEdit = ({id, history}) => {
  history.push({
    pathname: '/dashboard/usuarios/editar', state: {id},
  });
};

const UserTable = () => {
  const history = useHistory()
  const [users, setUsers] = useState([]);
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''});
  const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: ''});

  const actions = ({id}) => (<div>
    <Pencil
      style={{
        cursor: 'pointer', color: 'green', width: '30px'
      }}
      onClick={() => handleClickEdit({id, history})} />
    <Trash
      style={{
        cursor: 'pointer', color: 'red', width: '30px'
      }}
      onClick={() => {
        setConfirmDialog({
          isOpen: true,
          title: '¿Estás seguro que deseas eliminar este Usuario?',
          subTitle: 'No puedes deshacer está acción!',
          onConfirm: () => handleClickDelete({
            id: id, users, setUsers, setNotify, setConfirmDialog, confirmDialog,
          }),
        });
      }}
    />
  </div>);

  useEffect(async () => {
    if (!users.length) {
      const response = await getAllUsers();
      setUsers(response.data.data);
    }
  }, []);

  return (<>
    <Table
      columns={columns}
      rows={users}
      actions={actions}
      title={'Usuarios'}
      link={'/dashboard/usuario/agregar'}
    />
    <Notification notify={notify} setNotify={setNotify} />
    <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
  </>);
};

export default UserTable;
