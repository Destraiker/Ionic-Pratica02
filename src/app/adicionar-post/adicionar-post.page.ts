import { Component, OnInit } from '@angular/core';
import { PostsService } from '../service/posts.service';
import { Posts } from '../posts/post.interface';

@Component({
  selector: 'app-adicionar-post',
  templateUrl: './adicionar-post.page.html',
  styleUrls: ['./adicionar-post.page.scss'],
})
export class AdicionarPostPage implements OnInit {
  post:Posts={} as Posts;

  constructor(private servicePost: PostsService) { }

  ngOnInit() {
  }
  async onSubmit(form) {
    await this.servicePost.Post(form.value).then((x)=>{
      console.log("Deu certo");
    }).catch((err)=>{
      console.log("Deu Ruim");
    })
    
  }
}
