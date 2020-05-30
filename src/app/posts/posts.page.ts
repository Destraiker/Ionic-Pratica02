import { Component, OnInit } from '@angular/core';
import { PostsService } from '../service/posts.service';
import { Posts } from './post.interface';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})

export class PostsPage implements OnInit {
  posts: Posts[];
  postsPage: Posts[];
  aux: any;
  private index: number = 0;
  private readonly offset: number = 15;
  statusBarra = false;

  constructor(private servicePost: PostsService) {
    setTimeout(() => {
      this.statusBarra = true;
    }, 1000)
  }

  async ngOnInit() {
    await this.servicePost.Get().then(async (x) => {
      this.aux = x;
      this.posts = this.aux;
      this.postsPage = this.posts.slice(this.index, this.offset + this.index);
      this.index += this.offset;
      this.statusBarra=false;
      console.log(this.statusBarra);
    }).catch((err) => {
      console.log("Deu Ruim");
      console.log(err);
    })
  }

  loadData(event) {
    setTimeout(() => {
      let newPosts = this.posts.slice(this.index,this.offset+this.index);
      this.index += this.offset;
      
      for (let i=0;i<newPosts.length;i++) {
        this.postsPage.push(newPosts[i]);
      }
      console.log('Done');
      event.target.complete();
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.postsPage.length == this.posts.length) {
        event.target.disabled = true;
      }
    }, 500);
  }

}
