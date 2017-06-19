<?php
    require_once 'config.php';

    if(isset($_POST['cek'])){
        $id= $_POST['id'];
        $response = array();
		$sql = "SELECT barber_stat FROM tb_barber WHERE id_user='$id'";
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

    if(isset($_POST['toggle'])){
        $id= $_POST['id'];
        $to= $_POST['to'];
        $response = array();
        if($to == 1){
            $sql1 = "UPDATE tb_barber SET barber_stat = 0 WHERE id_user='$id'";
            $result1 = mysqli_query($db,$sql1);
            
            $sql = "SELECT barber_stat FROM tb_barber WHERE id_user='$id'";
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
        }else{
            $sql1 = "UPDATE tb_barber SET barber_stat = 1 WHERE id_user='$id'";
            $result1 = mysqli_query($db,$sql1);
            
            $sql = "SELECT barber_stat FROM tb_barber WHERE id_user='$id'";
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
		
    }
?>