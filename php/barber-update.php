<?php
    require_once 'config.php';

    if(isset($_POST['up'])){
        $id = $_POST['id'];
        $addr = $_POST['address'];
        $phone = $_POST['phone'];
        $about = $_POST['about'];
        $response = array();
		$sql = "UPDATE tb_barber SET barber_addr='$addr',barber_phone='$phone',barber_about='$about' WHERE id_user = '$id'";
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