<?php
    require_once 'config.php';

    if(isset($_POST['cek'])){
        $id = $_POST['id'];
        
        $response = array();
		$sql = "SELECT b.barber_img,b.barber_phone,u.username FROM tb_barber b, tb_users u WHERE b.id_user = u.id_user AND b.id_barber = '$id'";
        $result = mysqli_query($db,$sql);
        $num_row = mysqli_num_rows($result);
        while($row=mysqli_fetch_object($result)){
            $response[]=$row;
        }

        if($num_row > 0)
        {
            echo json_encode($response);
        }
        else
        {
            echo 0;
        }
    }
?>