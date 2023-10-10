import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './component/Login';
import NotFound from './component/NotFound';

//admin pages
import LayoutAdmin from './component/shared/LayoutAdmin';
import User from './component/admin/user/User';
import AddUser from './component/admin/user/AddUser';
import EditUser from './component/admin/user/EditUser';
import Menu from './component/admin/menu/Menu';
import AddMenu from './component/admin/menu/AddMenu';
import EditMenu from './component/admin/menu/EditMenu';
import Meja from './component/admin/meja/Meja';

//kasir pages
import LayoutKasir from './component/shared/LayoutKasir';
import Pemesanan from './component/kasir/Pemesanan';
import Riwayat from './component/kasir/Riwayat'

//manager pages
import LayoutManager from './component/shared/LayoutManager';
import DataTransaksi from './component/manager/DataTransaksi';
import Statistik from './component/manager/statistik';

function App() {
  if (sessionStorage.getItem('logged') !== "true") {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    )
  } else if (sessionStorage.getItem('logged') === "true" && sessionStorage.getItem('role') === "admin") {
    //Pages role admin
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LayoutAdmin />}>
            <Route index element={<User />} />
            <Route path="/add_user" element={<AddUser />} />
            <Route path="edit_user/:id_user" element={<EditUser />} />

            <Route path="/menu" element={<Menu />} />
            <Route path="/add_menu" element={<AddMenu />} />
            <Route path="edit_menu/:id_menu" element={<EditMenu />} />

            <Route path="/meja" element={<Meja />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    )
  } else if (sessionStorage.getItem('logged') === "true" && sessionStorage.getItem('role') === "kasir") {
    //Pages role kasir
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LayoutKasir />}>
            <Route index element={<Pemesanan />} />
            <Route path="/riwayat" element={<Riwayat />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    )
  } else if (sessionStorage.getItem('logged') === "true" && sessionStorage.getItem('role') === "manajer") {
    //Pages role manager
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LayoutManager />}>
            <Route path="/data_transaksi" element={<DataTransaksi />} />
            <Route path="/statistik_manager" element={<Statistik />} />
            {/* <Route path="/tes_123" element={<Tes />} /> */}
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    )
  }
}

export default App;
