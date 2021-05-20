// var postApi = 'https://jsonplaceholder.typicode.com/posts';

// fetch(postApi)
//     .then(function (responsive){
//         return responsive.json();
//         //thằng này nó trả về cho các bạn luon JSON.parse => js types r nên mk k càn phải mất công làm nữa
//     })
//     .then(function(post){
//         var htmls = post.map(function(post){
//             return `<li>
//                 <h2>${post.title}</h2>
//                 <p>${post.body}</p>
//             </li>`
//         })
//         var html = htmls.join('');//các phần tử nó sẽ cách nhau mỗi chuỗi rỗng
//         // vì đây là map nên mk sẽ nhận ra đc cái mảng =>jon nó thành chuỗi
//         document.getElementById('api_block').innerHTML = htmls
//         console.log(html)
//     })

// JSON server
 
// var postCourse = 'http://localhost:3000/course';
// fetch(postCourse)
//     .then(function(responsive){
//         return responsive.json();
//     })
//     .then(function(course){
//        var html = course.map(function(course){
//            return course.name;
//        })
        
//         document.getElementById('api_block').innerHTML = html
//     })

// Postman



//làm ứng dụng quản lí khóa học thêm , sửa xóa
// lấy id để sẵn tish sau

//biến để lưu api
var courseApi = 'http://localhost:3000/course';
// hàm để khi ứng dụng bắt đầu start 
function start (){
    getCourse(function(courses){
        // console.log(courses);
        rederCourses(courses);
    });//lấy ra cái khóa học
    handleCreateForm();
}
start();

// viest nhứng fuction đẻ dươi
function getCourse(callback) {
    //mặc định thằng này gửi đi với phuong thức GET r nên k cần định nghĩa phương thức
    fetch(courseApi)
        .then(function(responsive){
            return responsive.json();
        })
        .then(callback)
}
//có lấy (trên là đọc) thì có tạo
function createCourse(data,callback){
    //thằng fetch nó có cái đối số thứ 2 là thằng option(object)
    var options = {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body :JSON.stringify(data)
    }
    fetch(courseApi, options)
        .then(function(responsive){
            return responsive.json
        })
        .then(callback);
}
//tạo hàm xóa
function deleteCourse(id){
    var options = {
        method : 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        // body :JSON.stringify(data)
    }
    // /id giống thằng trong postmant ấy lf xóa theo thằng id
    fetch(courseApi + "/" + id, options)
        .then(function(responsive){
            return responsive.json
        })
        .then(function(){
            // getCourse(function(courses){
            //     // console.log(courses);
            //     rederCourses(courses);
            // });//lấy ra
            //làm như trên thì ta lại mất công gửi đi Api để tránh thì mk nên xóa thẳng thẻ li đi 
            var course_item = document.querySelector('.course-item'+ id)
            if(course_item){
                course_item.remove();
            }
        });
}


function rederCourses(courses){
    var listCoursesBlock = document.querySelector('#list-courses');
    var html = courses.map(function(course){
        return `
            <li class="course-item-${course.id}">
                <h4>${course.name}</h4>
                <p>${course.descript}</p>
                <button onclick = "deleteCourse(${course.id})">Xóa</button>
            </li>
        `
    })
    listCoursesBlock.innerHTML = html.join('');

}
//hàm tạo ms t
function handleCreateForm(){
    //viết logic tạo ms dl
    var createBtn = document.querySelector('#create');
    createBtn.onclick = function(){
        //nhiệm vụ đó là lấy dl đổ từ 2 ô input
        var name = document.querySelector('input[name = "name"]').value;
        var descript = document.querySelector('input[name="descript"').value;
        var formData = {
            name : name,
            descript : descript
        }
        createCourse(formData,function(){

        });
        //gửi đi 1 yêu cầu tạo mới dl dưới phuong thúc  POST
        //nó thêm cho mk mỗi cái id ='4 thui do thiếu  cái header trên kia nhá
        //gọi lại cái hàm dưới đây để nó rander ra cái code ms
        getCourse(function(courses){
            // console.log(courses);
            rederCourses(courses);
        });//lấy ra cái khóa học

    }
};
//delete và xóa thì cần có id đúng hơm