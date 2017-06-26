<?php
    require_once 'config.php';
    require_once 'image_crop.php';

    if(isset($_FILES["u_st_file"]["type"]))
    {
        $id     = $_POST['id'];
        $ids    = $_POST['ids'];
        $name   = $_POST['sty'];
        $price  = $_POST['prc'];
        if($_FILES["u_st_file"]["type"] == null){
            $sql = "UPDATE tb_style SET sty_name = '$name',sty_price = '$price' WHERE id_style = '$ids'";
            $result = mysqli_query($db,$sql);
            echo "Style Updated Successfully...!!";
        }else{
            $validextensions = array("jpeg", "jpg","png");
            $temporary = explode(".", $_FILES["u_st_file"]["name"]);
            $file_extension = end($temporary);

            //CREATE DIR
            $path = '../upload/style/'.$id;

            if ((($_FILES["u_st_file"]["type"] == "image/png") || ($_FILES["u_st_file"]["type"] == "image/jpg") || ($_FILES["u_st_file"]["type"] == "image/jpeg")
            ) && ($_FILES["u_st_file"]["size"] < 100000)//Approx. 100kb files can be uploaded.
            && in_array($file_extension, $validextensions)) {
                if ($_FILES["u_st_file"]["error"] > 0)
                {
                    echo "Return Code: " . $_FILES["u_st_file"]["error"];
                }
                else
                {
                    if (file_exists($path."/".$_FILES["u_st_file"]["name"])) {
                        echo $_FILES["u_st_file"]["name"] . "already exists.";
                    }
                    else
                    {
                        $temp = explode(".", $_FILES["u_st_file"]["name"]);
                        $newfilename = $name . '.' . end($temp);
                        move_uploaded_file($_FILES["u_st_file"]["tmp_name"], $path."/". $newfilename);
                        
                        resize_crop_image(500, 500, $path."/". $newfilename, $path."/". $newfilename);

                        $sql = "UPDATE tb_style SET sty_name = '$name',sty_price = '$price',sty_img = '$newfilename' WHERE id_style = '$ids'";
                        $result = mysqli_query($db,$sql);
                        echo "Style Updated Successfully...!!";
                    }
                }
            }
            else
            {
                echo "***Invalid file Size or Type***";
            }
            
        }
    }
?>