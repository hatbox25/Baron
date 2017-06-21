<?php
    require_once 'config.php';

    if(isset($_POST['del'])){
        $id= $_POST['id'];
        $path= $_POST['path'];
        
        $response = array();
		$sql = "DELETE FROM tb_style WHERE id_style = '$id'";
        $result = mysqli_query($db,$sql);
        
        unlink('../'.$path);
        
        if($result)
        {
            echo 1;
        }
        else
        {
            echo 0;
        }
    }
?>