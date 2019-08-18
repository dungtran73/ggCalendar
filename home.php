<?php
session_start();

if(!isset($_SESSION['access_token'])) {
	header('Location: google-login.php');
	exit();	
}

?>
<!DOCTYPE html5>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Thêm lịch công tác</title>
<!-- Main -->
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.1.9/jquery.datetimepicker.min.css" />
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.1.9/jquery.datetimepicker.min.js"></script>

<script>
    function getValue() {
        var items = [];
        $('#demo2 option:selected').each(function(){ items.push($(this).val()); });
        var attd = items.join(', ');
        
		return attd;
    }
	
</script>

<script>

// Selected time should not be less than current time
function AdjustMinTime(ct) {
	var dtob = new Date(),
  		current_date = dtob.getDate(),
  		current_month = dtob.getMonth() + 1,
  		current_year = dtob.getFullYear();
  			
	var full_date = current_year + '-' +
					( current_month < 10 ? '0' + current_month : current_month ) + '-' + 
		  			( current_date < 10 ? '0' + current_date : current_date );

	if(ct.dateFormat('Y-m-d') == full_date)
		this.setOptions({ minTime: 0 });
	else 
		this.setOptions({ minTime: false });
	
}

</script>


<!---------------->

<!--A-->

<link rel="stylesheet" type="text/css" href="style.css">
</head>

<body>

<div id="form-container">
	<input type="text" id="event-title" placeholder="Tên sự kiện" autocomplete="off" />
	<input type="text" id="event-start-time" placeholder="Thời gian" autocomplete="off" />
	<input type="text" id="attendees" placeholder="Khách mời" />
	<input type="text" id="event-location" placeholder="Địa điểm" autocomplete="off" />
	<input type="text" id="event-host" placeholder="Chủ trì" autocomplete="off" />
	<input type="text" id="event-id" style="display:none" />
	<button id="create-update-event" data-operation="create" data-event-id="">Tạo sự kiện</button>
	<button id="delete-event" >Xóa sự kiện</button>
</div>

<script>
	// DateTimePicker plugin : http://xdsoft.net/jqplugins/datetimepicker/
	$("#event-start-time").datetimepicker({ format: 'Y-m-d H:i', minDate: 0, minTime: 0, step: 5, onShow: AdjustMinTime, onSelectDate: AdjustMinTime });
</script>

<!--Form-->
<?php
    //database configuration
    $dbHost = 'localhost';
    $dbUsername = 'root';
    $dbPassword = '';
    $dbName = 'test';
    
    //connect with the database
    $db = new mysqli($dbHost,$dbUsername,$dbPassword,$dbName);
?>
    <div id="wrapper">
<?php
    
    $s="";
    $q=$db->query("SELECT * FROM donvi");
    
    while ($r=$q->fetch_assoc()) {
        # code...
        $sq="SELECT * FROM nv WHERE tag='".$r["tag"]."'";
        $sql=$db->query($sq);
        while ($row=$sql->fetch_assoc()) {
            # code...
            $s=$s."<option value=\"".$row["name"]."\" data-section=\"".$r["tag"]."\">".$row["name"]."</option>";
        }
    }

?>
        <select id="demo2" multiple="multiple" onchange="getValue()">
                <?php
                    print $s;
                ?>

            </select>

        <script src="https://code.jquery.com/jquery-1.12.4.min.js">
        </script>

        <script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js">
        </script>

        <!-- <script src="https://cdn.rawgit.com/patosai/tree-multiselect/v2.5.2/dist/jquery.tree-multiselect.min.js">
        </script> -->
        <script src="tree-multiselect.js"></script>
        <script>
            $("select#demo2").treeMultiselect({ searchable: true, searchParams: ['section', 'text'], enableSelectAll:true, startCollapsed:true, });
        </script>
        <!--
            <link rel="stylesheet" href="https://cdn.rawgit.com/patosai/tree-multiselect/v2.5.2/dist/jquery.tree-multiselect.min.css" />
        -->
    </div>


<script>
// Send an ajax request to create event
$("#create-update-event").on('click', function(e) {
	
	var blank_reg_exp = /^([\s]{0,}[^\s]{1,}[\s]{0,}){1,}$/,
		error = 0,
		parameters;

	$(".input-error").removeClass('input-error');

	if(!blank_reg_exp.test($("#event-title").val())) {
		$("#event-title").addClass('input-error');
		error = 1;
	}

	if(!blank_reg_exp.test($("#event-start-time").val())) {
			$("#event-start-time").addClass('input-error');
			error = 1;
		}		

	if(error == 1)
		return false;

	var attd=getValue();
	var sTime=$("#event-start-time").val().replace(' ', 'T') + ':00';
	var pos=sTime.indexOf('T');
	var hh=parseInt($("#event-start-time").val().substr(pos+1,2))+2;
	//2019-02-26T20:28:00
	var eTime=sTime.substr(0,11)+hh.toString()+sTime.substr(-6);
	console.log(attd);

	// Event details
	parameters = { 	title: $("#event-title").val(), 
					event_time: {
						start_time: $("#event-start-time").val().replace(' ', 'T') + ':00' ,
						end_time: eTime ,
					},
					location: $("#event-location").val(),
					description: $("#event-host").val(),
					//test
					event_attendees: attd,
					operation: $(this).attr('data-operation'),
					event_id: $(this).attr('data-operation') == 'create' ? null : $(this).attr('data-event-id')
				};

	$("#create-update-event").attr('disabled', 'disabled');
	$.ajax({
        type: 'POST',
        url: 'ajax.php',
        data: { event_details: parameters },
        dataType: 'json',
        success: function(response) {
        	$("#create-update-event").removeAttr('disabled');
        	if(parameters.operation == 'create') {
        		$("#create-update-event").text('Cập nhật sự kiện').attr('data-event-id', response.event_id).attr('data-operation', 'update');
        		$("#delete-event").show();
        		alert('Event created with ID : ' + response.event_id);
				$("#event-id").val()=response.event_id;
        	}
        	else if(parameters.operation == 'update') {
        		alert('Event ID ' + parameters.event_id + ' updated');
        	}
        },
        error: function(response) {
            $("#create-update-event").removeAttr('disabled');
            alert(response.responseJSON.message);
        }
    });
});

// Send an ajax request to delete event
$("#delete-event").on('click', function(e) {
	// Event details
	var parameters = { 	operation: 'delete',
						event_id: $("#create-update-event").attr('data-event-id')
					};

	$("#create-update-event").attr('disabled', 'disabled');
	$("#delete-event").attr('disabled', 'disabled');
	$.ajax({
        type: 'POST',
        url: 'ajax.php',
        data: { event_details: parameters },
        dataType: 'json',
        success: function(response) {
        	$("#delete-event").removeAttr('disabled').hide();

        	$("#form-container input").val('');
        	$("#create-update-event").removeAttr('disabled');
        	$("#create-update-event").text('Tạo sự kiện').attr('data-event-id', '').attr('data-operation', 'create');

        	alert('Event ID ' + parameters.event_id + ' deleted');
        },
        error: function(response) {
            $("#delete-event").removeAttr('disabled');
            alert(response.responseJSON.message);
        }
    });
});
</script>

</body>
</html>