<?php
    require_once 'config.php';

    if(isset($_POST['get'])){
        
        $response = array();
		$sql = "SELECT u.username,b.id_barber,s.sty_name,s.sty_img,s.sty_price FROM tb_style s,tb_barber b,tb_users u WHERE s.id_barber=b.id_barber AND b.id_user=u.id_user ORDER BY s.sty_price DESC";
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