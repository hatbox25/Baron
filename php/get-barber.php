<?php
    require_once 'config.php';

    if(isset($_POST['get'])){
        
        $response = array();
		$sql = "SELECT b.id_barber,b.barber_img,b.barber_addr,b.barber_phone,b.barber_about,u.username FROM tb_barber b, tb_users u WHERE b.id_user = u.id_user AND b.barber_stat = '1'";
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