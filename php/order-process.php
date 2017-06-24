<?php
    require_once 'config.php';

    if(isset($_POST['pro'])){
        $idu = $_POST['idu'];
        $idb = $_POST['idb'];
        $ids = $_POST['ids'];
        $addr = $_POST['addr'];
        $phone = $_POST['phone'];
        $price = $_POST['price'];
        $now = $_POST['time'];
        
		$sql0 = "SELECT barber_stat FROM tb_barber WHERE id_barber='$idb'";
        $result0 = mysqli_query($db,$sql0);
        
        while($row = mysqli_fetch_assoc($result0)){
            if($row['barber_stat'] == 1){
                $sql = "INSERT INTO tb_order(id_user,id_barber,id_style,ord_address,ord_phone,ord_price,dt_order,ord_status) VALUES('$idu','$idb','$ids','$addr','$phone','$price','$now','proses')";
                $result = mysqli_query($db,$sql);

                $sql1 = "UPDATE tb_barber SET barber_stat=0 WHERE id_barber='$idb'";
                $result1 = mysqli_query($db,$sql1);

                if($result && $result1)
                {
                    $sql3 = "SELECT id_order FROM tb_order WHERE id_user='$idu' AND dt_order='$now'";
                    $result3 = mysqli_query($db,$sql3);
                    while($line = mysqli_fetch_assoc($result3)){
                        echo $line['id_order'];
                    }
                }
                else
                {
                    echo 0;
                }
            }else{
                echo 'Barber is currently unavailable';
            }
        }
        
    }
?>