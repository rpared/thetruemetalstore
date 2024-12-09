import { Injectable } from '@angular/core';
import { IAlbum } from '../components/album-list/album-list.component';

type QuantityChange = {
  id: number;
  data: number;
};

@Injectable({
  providedIn: 'root'
})

export class AlbumService {
  private albums: IAlbum[] = [
    {
      title: "De Mysteriis Dom Sathanas",
      artist: "Mayhem",
      genre: "Black Metal",
      price: 18.99,
      id: 5,
      quantity: 10,
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/Mayhem_demysteriisdomsathanas.jpg/220px-Mayhem_demysteriisdomsathanas.jpg"
    },
    {
      title: "Khronos",
      artist: "Rotting Christ",
      genre: "Black Metal",
      price: 17.49,
      id: 6,
      quantity: 12,
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Khronos.jpg/220px-Khronos.jpg"
    },
    {
      title: "Director's Cuts",
      artist: "To The Grave",
      genre: "Deathcore",
      price: 15.99,
      id: 7,
      quantity: 8,
      imageUrl: "https://www.angrymetalguy.com/wp-content/uploads/2023/02/To-the-Grave-Directors-Cuts-01-500x500.jpg"
    },
    {
      title: "Litourgiya",
      artist: "Batushka",
      genre: "Black Metal",
      price: 21.99,
      id: 8,
      quantity: 5,
      imageUrl: "https://www.metal-archives.com/images/5/4/6/2/546258.jpg?2855"
    },
    {
      title: 'Master of Puppets',
      artist: 'Metallica',
      genre: 'Thrash Metal',
      price: 19.99,
      id: 1,
      quantity: 20,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/b/b2/Metallica_-_Master_of_Puppets_cover.jpg'
    },
    {
      title: 'Painkiller',
      artist: 'Judas Priest',
      genre: 'Heavy Metal',
      price: 14.99,
      id: 2,
      quantity: 30,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/16/Judaspainkiller.JPG/220px-Judaspainkiller.JPG'
    },
    {
      title: 'Reign in Blood',
      artist: 'Slayer',
      genre: 'Thrash Metal',
      price: 16.99,
      id: 3,
      quantity: 25,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/Reign_in_blood.jpg/220px-Reign_in_blood.jpg'
    },
    {
      title: 'Black Sabbath',
      artist: 'Black Sabbath',
      genre: 'Heavy Metal',
      price: 12.99,
      id: 4,
      quantity: 15,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/da/Black_Sabbath_debut_album.jpg/220px-Black_Sabbath_debut_album.jpg'
    },
    {
      title: "Paranoid",
      artist: "Black Sabbath",
      genre: "Heavy Metal",
      price: 13.99,
      id: 9,
      quantity: 20,
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/6/64/Black_Sabbath_-_Paranoid.jpg"
    },
    {
      title: "Once Upon the Cross",
      artist: "Deicide",
      genre: "Death Metal",
      price: 19.99,
      id: 10,
      quantity: 10,
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Once_upon_the_cross.jpg/220px-Once_upon_the_cross.jpg"
    },
    {
      title: "In the Nightside Eclipse",
      artist: "Emperor",
      genre: "Black Metal",
      price: 20.49,
      id: 11,
      quantity: 6,
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6a/Inthenightsideclipseemperor.jpg/220px-Inthenightsideclipseemperor.jpg"
    },
    {
      title: "Totenritual",
      artist: "Belphegor",
      genre: "Blackened Death Metal",
      price: 22.99,
      id: 12,
      quantity: 9,
      imageUrl: "https://www.metal-archives.com/images/6/7/0/7/670726.jpg?5056"
    }
  ];

  getAlbums(): IAlbum[] {
    return this.albums;
  }

  getTotal(): number {
    return this.albums.length;
  }

  deleteAlbum(id: number): IAlbum[] {
    this.albums = this.albums.filter((album) => album.id !== id);
    return this.albums;
  }

  quantityChange(data: QuantityChange): IAlbum[] {
    return this.handleQuantityChange(data.id, data.data);
  }

  handleQuantityChange(id: number, data: number): IAlbum[] {
    this.albums = this.albums.map((album) =>
      album.id === id
        ? {
            ...album,
            quantity:
              data > 0
                ? album.quantity + data
                : album.quantity > 0
                ? album.quantity + data
                : 0,
          }
        : album
    );
    return this.albums;
  }

  addAlbum(newAlbum: Omit<IAlbum, 'id' | 'imageUrl'>): IAlbum[] {
    const albumToAdd: IAlbum = {
      ...newAlbum,
      imageUrl: 'https://via.placeholder.com/150',
      id: Math.floor(Math.random() * 1000),
    };
    this.albums.push(albumToAdd);
    return this.albums;
  }

  searchAlbum(searchTerm: string): IAlbum[] {
    return this.albums.filter((album) =>
      album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      album.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

// CART FUNCTIONALITY

  private cart: IAlbum[] = []; // Add cart array to the service
    // New cart-related methods
    getCart(): IAlbum[] {
      return this.cart;
    }
  
    addToCart(album: IAlbum): { success: boolean; cart: IAlbum[] } {
      // Check if album is in stock
      const existingItem = this.cart.find(item => item.id === album.id);
    
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        this.cart.push({ ...album, quantity: 1 });
      }

      return { success: true, cart: this.cart };
    }
  
    removeFromCart(album: IAlbum): { success: boolean; cart: IAlbum[] } {
      // Find the index of the album in the cart
      const index = this.cart.findIndex(a => a.id === album.id);
      
      if (index !== -1) {
        // Remove from cart
        this.cart.splice(index, 1);
        
        // Increase quantity back
        this.handleQuantityChange(album.id, 1);
        
        return { 
          success: true, 
          cart: this.cart 
        };
      }
      
      return { 
        success: false, 
        cart: this.cart 
      };
    }

      // Update cart item quantity
  updateCartItemQuantity(album: IAlbum, quantity: number): void {
    const existingItem = this.cart.find(item => item.id === album.id);
    
    if (existingItem) {
      if (quantity > 0) {
        existingItem.quantity = quantity;
      } else {
        this.removeFromCart(album);
      }
    }
  }


  
    getCartTotal(): number {
      return this.cart.reduce((total, album) => total + album.price, 0);
    }
  
    clearCart(): void {
      // Restore quantities for items in the cart
      this.cart.forEach(cartItem => {
        this.handleQuantityChange(cartItem.id, 1);
      });
      
      // Clear the cart
      this.cart = [];
    }
  }
