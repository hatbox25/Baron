<?php
	require_once 'config.php';
		
	if (isset($_POST['acpt'])){
		$id = $_POST['id'];
        $idb = $_POST['idb'];
				
		$sql = "UPDATE tb_order SET ord_status='ditolak',new='1' WHERE id_order='$id'";
		$result = mysqli_query($db,$sql);
        
		$sql1 = "UPDATE tb_barber SET barber_stat=1 WHERE id_barber='$idb'";
		$result1 = mysqli_query($db,$sql1);
        
		if($result && $result1)
        {
            echo 1;
        }
        else
        {
            echo 0;
        }
	}
?>