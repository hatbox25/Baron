<?php
    require_once 'config.php';

    if(isset($_POST['get'])){
        $id= $_POST['id'];
        
        $response = array();
		$sql = "SELECT * FROM tb_style WHERE id_barber = '$id'";
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