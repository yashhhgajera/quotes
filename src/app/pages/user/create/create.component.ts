import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  textdata = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias quod numquam assumenda repellat praesentium nesciunt quos quo temporibus odio quis ab excepturi tempore magni beatae iusto soluta, exercitationem aliquid, laudantium porro voluptas repellendus vero delectus dolore nam. Aut molestias, natus saepe voluptatum incidunt, quasi dolorum animi dolore mollitia quia quos tempore repellat libero maiores? Aspernatur doloribus dolor veniam repellat, sapiente autem perspiciatis numquam sunt animi eius nihil omnis, vitae optio molestias, nostrum fugit ad voluptates laudantium reprehenderit consectetur error deserunt. Possimus odio officia id earum sunt nulla perspiciatis nisi quam incidunt illum quasi dolor ullam harum beatae dolores numquam consequatur esse qui deserunt nam ad, et distinctio illo! Ipsam expedita dolorem totam, commodi cupiditate molestiae? Eligendi, nisi expedita deleniti porro vel rerum ab dolores quae ea eius, non praesentium? Iusto sunt dicta ut provident corporis quisquam reiciendis repudiandae illo deleniti quidem ea tenetur iure, vero facilis fugiat laborum eveniet sit numquam doloremque pariatur tempora velit delectus. Expedita rem voluptate voluptates natus laboriosam impedit illum dignissimos eaque necessitatibus inventore, blanditiis dolores, eum saepe sequi. Cum repudiandae necessitatibus vel dolores labore consequatur delectus voluptate sint, fuga quidem asperiores repellendus dignissimos ullam incidunt accusantium placeat consequuntur cumque, ducimus, aperiam atque eveniet dicta. Quas!"
  blogData = this.fb.group({
    "blogTitle": [''],
    "blogDescription": ['']
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  publish(){
    console.log(this.blogData.value);
  }

}
