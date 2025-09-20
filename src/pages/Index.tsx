import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import Icon from '@/components/ui/icon'

type Article = {
  id: number
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  date: string
  readTime: string
  image: string
  comments: Comment[]
}

type Comment = {
  id: number
  author: string
  content: string
  date: string
  avatar?: string
}

const mockArticles: Article[] = [
  {
    id: 1,
    title: "Искусство написания: классические техники",
    excerpt: "Изучаем вековые традиции и методы, которые делают текст по-настоящему запоминающимся и воздействующим на читателя.",
    content: "В мире, где информация потоком обрушивается на нас каждый день, искусство создания качественного текста становится особенно ценным. Классические техники письма, проверенные временем, остаются актуальными и сегодня...",
    category: "Писательство",
    author: "Анна Сергеева",
    date: "15 сентября 2024",
    readTime: "8 мин",
    image: "/img/98d75915-7c40-4ead-815f-48f5a1f82dc5.jpg",
    comments: [
      {
        id: 1,
        author: "Михаил К.",
        content: "Отличная статья! Особенно понравился раздел о структуре повествования.",
        date: "16 сентября 2024",
        avatar: "МК"
      },
      {
        id: 2,
        author: "Елена Петрова",
        content: "Спасибо за практические советы. Уже применяю в своих текстах!",
        date: "17 сентября 2024", 
        avatar: "ЕП"
      }
    ]
  },
  {
    id: 2,
    title: "Современные тенденции в дизайне",
    excerpt: "Разбираем актуальные направления в визуальном дизайне и их влияние на пользовательский опыт.",
    content: "Дизайн постоянно эволюционирует, отражая изменения в технологиях, культуре и способах взаимодействия людей с цифровыми продуктами...",
    category: "Дизайн",
    author: "Дмитрий Волков",
    date: "12 сентября 2024",
    readTime: "6 мин",
    image: "/img/7fe257d6-8249-4f14-a0f0-4a87451ff270.jpg",
    comments: []
  },
  {
    id: 3,
    title: "Философия минимализма в творчестве",
    excerpt: "Как принцип 'меньше значит больше' помогает создавать глубокие и значимые произведения.",
    content: "Минимализм — это не просто убрать лишнее. Это искусство находить суть, выражать максимум смысла минимальными средствами...",
    category: "Философия",
    author: "Ирина Белова",
    date: "10 сентября 2024",
    readTime: "10 мин",
    image: "/img/98d75915-7c40-4ead-815f-48f5a1f82dc5.jpg",
    comments: [
      {
        id: 3,
        author: "Алексей М.",
        content: "Глубокие мысли. Минимализм действительно требует большего мастерства.",
        date: "11 сентября 2024",
        avatar: "АМ"
      }
    ]
  }
]

function Index() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [currentView, setCurrentView] = useState<'home' | 'archive' | 'categories'>('home')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [newComment, setNewComment] = useState('')

  const categories = Array.from(new Set(mockArticles.map(article => article.category)))

  const filteredArticles = selectedCategory 
    ? mockArticles.filter(article => article.category === selectedCategory)
    : mockArticles

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedArticle) return
    
    const comment: Comment = {
      id: Date.now(),
      author: "Гость",
      content: newComment,
      date: new Date().toLocaleDateString('ru-RU'),
      avatar: "Г"
    }
    
    selectedArticle.comments.push(comment)
    setNewComment('')
  }

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-white sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                onClick={() => setSelectedArticle(null)}
                className="text-primary hover:text-primary/80"
              >
                <Icon name="ArrowLeft" size={20} className="mr-2" />
                Назад к статьям
              </Button>
              <h1 className="text-xl font-montserrat font-semibold text-primary">CLASSIC BLOG</h1>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <article className="animate-fade-in">
            <div className="mb-8">
              <img 
                src={selectedArticle.image} 
                alt={selectedArticle.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              
              <div className="space-y-4">
                <Badge variant="secondary" className="text-xs font-montserrat">
                  {selectedArticle.category}
                </Badge>
                
                <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-primary leading-tight">
                  {selectedArticle.title}
                </h1>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{selectedArticle.author}</span>
                  <Separator orientation="vertical" className="h-4" />
                  <span>{selectedArticle.date}</span>
                  <Separator orientation="vertical" className="h-4" />
                  <span>{selectedArticle.readTime} чтения</span>
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-lg leading-relaxed text-foreground">
                {selectedArticle.content}
              </p>
            </div>

            <Separator className="my-8" />

            <section className="space-y-6">
              <h3 className="text-xl font-montserrat font-semibold text-primary flex items-center gap-2">
                <Icon name="MessageCircle" size={20} />
                Комментарии ({selectedArticle.comments.length})
              </h3>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarFallback>Г</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <Textarea
                      placeholder="Поделитесь своими мыслями..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <Button 
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Добавить комментарий
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {selectedArticle.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3 p-4 bg-muted/30 rounded-lg">
                      <Avatar>
                        <AvatarFallback>{comment.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-montserrat font-medium text-sm">
                            {comment.author}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {comment.date}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </article>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-montserrat font-bold text-primary">
                CLASSIC BLOG
              </h1>
              <p className="text-muted-foreground mt-1">
                Элегантная площадка для глубоких мыслей
              </p>
            </div>
            
            <nav className="flex gap-2">
              <Button
                variant={currentView === 'home' ? 'default' : 'ghost'}
                onClick={() => {
                  setCurrentView('home')
                  setSelectedCategory('')
                }}
                className="font-montserrat"
              >
                <Icon name="Home" size={16} className="mr-2" />
                Главная
              </Button>
              <Button
                variant={currentView === 'archive' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('archive')}
                className="font-montserrat"
              >
                <Icon name="Archive" size={16} className="mr-2" />
                Архив
              </Button>
              <Button
                variant={currentView === 'categories' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('categories')}
                className="font-montserrat"
              >
                <Icon name="Tag" size={16} className="mr-2" />
                Категории
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {currentView === 'home' && (
          <div className="animate-fade-in">
            <section className="mb-12">
              <img 
                src="/img/98d75915-7c40-4ead-815f-48f5a1f82dc5.jpg" 
                alt="Blog hero"
                className="w-full h-64 md:h-80 object-cover rounded-lg mb-8"
              />
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-primary mb-4">
                  Добро пожаловать в мир идей
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Здесь рождаются глубокие мысли, обсуждаются важные темы и создается 
                  пространство для интеллектуального обмена.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-montserrat font-semibold text-primary mb-6">
                Последние публикации
              </h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {mockArticles.slice(0, 3).map((article) => (
                  <Card 
                    key={article.id} 
                    className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
                    onClick={() => setSelectedArticle(article)}
                  >
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-xs font-montserrat">
                          {article.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {article.readTime}
                        </span>
                      </div>
                      <CardTitle className="text-lg font-montserrat leading-tight">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="leading-relaxed mb-4">
                        {article.excerpt}
                      </CardDescription>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{article.author}</span>
                        <span>{article.date}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {currentView === 'archive' && (
          <div className="animate-fade-in">
            <section className="mb-8">
              <h2 className="text-2xl font-montserrat font-semibold text-primary mb-6">
                Архив статей
              </h2>
              <div className="space-y-4">
                {mockArticles.map((article) => (
                  <Card 
                    key={article.id}
                    className="cursor-pointer transition-all duration-300 hover:shadow-md"
                    onClick={() => setSelectedArticle(article)}
                  >
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-full md:w-32 h-24 object-cover rounded"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="text-xs font-montserrat">
                              {article.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {article.readTime}
                            </span>
                          </div>
                          <CardTitle className="text-lg font-montserrat leading-tight mb-2">
                            {article.title}
                          </CardTitle>
                          <CardDescription className="leading-relaxed mb-2">
                            {article.excerpt}
                          </CardDescription>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{article.author}</span>
                            <span>{article.date}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {currentView === 'categories' && (
          <div className="animate-fade-in">
            <section className="mb-8">
              <h2 className="text-2xl font-montserrat font-semibold text-primary mb-6">
                Категории
              </h2>
              
              <div className="flex flex-wrap gap-2 mb-8">
                <Button
                  variant={selectedCategory === '' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('')}
                  className="font-montserrat"
                >
                  Все категории
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category)}
                    className="font-montserrat"
                  >
                    {category}
                  </Button>
                ))}
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredArticles.map((article) => (
                  <Card 
                    key={article.id} 
                    className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
                    onClick={() => setSelectedArticle(article)}
                  >
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs font-montserrat">
                          {article.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {article.readTime}
                        </span>
                      </div>
                      <CardTitle className="text-lg font-montserrat leading-tight">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="leading-relaxed mb-4">
                        {article.excerpt}
                      </CardDescription>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{article.author}</span>
                        <span>{article.date}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  )
}

export default Index