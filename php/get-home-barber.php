<?php
    require_once 'config.php';

    if(isset($_POST['get'])){
        
        $response = array();
		$sql = "SELECT DISTINCT b.barber_img,b.barber_addr,b.barber_phone,b.barber_about,u.username,(SELECT AVG(rating) FROM tb_order WHERE id_barber=b.id_barber) as skor FROM tb_barber b, tb_users u, tb_order o WHERE b.id_user = u.id_user AND b.id_barber = o.id_barber ORDER BY skor DESC";
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