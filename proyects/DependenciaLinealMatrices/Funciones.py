def Crear(C,d,n):
    '''Funcion que Crea una matriz con los vectores,ubicandolos
   cada uno como filas de la misa, con dimensiones d x n
   (d=dimension del espacio x n=cantidad de vectores)'''

    print("Ingrese cada vector separando sus cordenadas con espacios.Ej= '1 5 6' ")
    for i in range(n):
        vector_valido=False

        while (vector_valido==False):

            lista=input("Ingrese coordenadas del vector "+ str(i+1)+":")
            V=[float(x) for x in lista.split()]

            if (len(V)==d):
                C.append(V)
                vector_valido=True
            else:
                print("Vector no es de dimension "+ str(d) +" Intente Nuevamente")
        
    return C


def Dimensión(n,d):
    '''Funcion que analiza si la cantidad de vectores es mayor a la
    dimension del espacio, ya que si tenemos mas vectores que coordenadas,
    el conjunto sera Linealmente Dependiente'''
    if (n>d):
        return True
    else:
        return False
    
def Triangular_Inferior(C,d,n):
    '''Funcion que Verifica que la matriz formada por vectores no sea
    triangular inferior, ya que si lo son el conjunto es
    Linealmente Independiente'''
    c=0
    for i in range (1,n):
        for j in range (d):
            if (i>j):
                if(C[i][j]==0):
                    c=c
                else:
                    c=c+1
    if (c==0):
        return False
    else:
        return True


def Triangular_Superior(C,d,n):
    '''Funcion que Verifica que la matriz formada por vectores no sea
    triangular inferior, ya que si lo son el conjunto es
    Linealmente Independiente'''
    c=0
    for i in range (1,n):
        for j in range (d):
            if (i<j):
                if(C[i][j]==0):
                    c=c
                else:
                    c=c+1
    if (c==0):
        return False
    else:
        return True
    
def Fila_Nula (C,d):
    '''Funcion que analiza si alguna fila es nula,devolviendo:
    False cuando existe una fila nula,y True cuando ninguna fila es nula'''
    for i in (C):
        if(i.count(0)==d):
            return False
    else:
            return True

def Fila_Igual(C,n):
    '''Funcion encargada de verificar que no existan filas iguales,
    ya que de hacerlo el conjunto sera "Linealmente Dependiente",
    devolviendo: False en caso que no exista filas iguales, True caso contrario'''
    fila_igual = False
    for i in range (n):
        for j in range (n):
            if(i!=j)and(C[i]==C[j]):
                    fila_igual = True
    
    return fila_igual


def Gauss(A,d,n):
    '''Funcion que se encarga de Triangular las filas(Vectores del conjunto)
    de la matriz(C), devolviendo False en caso que el conjunto sea LD
    (una fila se anula), Y True en caso que el conjunto sea LI
      'Factorizacion por Gauss'  '''
    
    contador1=0
    V3=True
    V4=True
    V5=True
    V6=False
    v3=0
    v4=0 
    while(contador1!=d) and (V3==True) and (V5==True) and (V4==True) and (V6==False):
            for j in range (contador1,n):
                for i in range ((d-1),(-1+contador1),-1):
                    if (A[j][contador1]!=1) and (A[j][contador1]!=0):
                        t=A[j][contador1]
                        A[j][i]=(A[j][i]/t)
                    if (A[j][contador1]==0):
                        c=0
                        while (A[j][c]==0)and (c<d):
                            c=c+1
                        if (c!=0) and (c<d):
                            t=A[j][c]
                            A[j][i]=(A[j][i]/t)

            for j in range (n-1,contador1,-1):
                if (A[j][contador1]==0):
                        h=0
                        m=0
                        while(A[j][h]==0) and (h<d):
                            h=h+1
                        while(A[j-1][m]==0) and (m<d):
                            m=m+1
                        if (h==m):
                            for i in range(h,d):
                                b=A[j][i]
                                A[j][i]=b-A[j-1][i]

                if (A[j][contador1]!=0):                    
                    for i in range (d):
                        a=A[j][i]
                        A[j][i]=a-A[contador1][i]
                                
            V6=Fila_Igual(A,n)
            V3=Fila_Nula(A,d)
            if (V3==True):
                A=Cambia_Fila(A,d,n)
                if(Diagonal_Nula(A,d,n)==False) and (d==n):
                    V5=Triangular_Inferior(A,d,n)
                    V4=Triangular_Superior(A,d,n)
                if(V4==False) or (V5==False):
                    v4=v4+1
            if(V3==False):
                v3=v3+1
                
            contador1=contador1+1

    if(V6==True):
        return False

    if (contador1==d):
        if(d==n):
            if(Diagonal_Nula(A,d,n)==False):
                return True  #Conjunto LI
            else:
                return False #Conjunto LD
        else:
            return True
    if (v4>0):
        return True  #Conjunto LI
    
    if(v3>0):
        return False  #Conjunto LD
    
                
def Cambia_Fila(C,d,n):
    '''Funcion que reacomoda a las filas, colocando la que poseea mayor cantidad de ceros
        por delante de un numero no nulo, en la ultima posicion'''
    x=0
    while(x<n):
        for i in range (n-1):
            contador1=0
            contador2=0
            j=0
            while (C[i][j]==0):
                contador1=contador1+1
                j=j+1
            j=0    
            while(C[i+1][j]==0):    
                contador2=contador2+1
                j=j+1   
    
            if (contador2<contador1):
                t=C[i]
                C[i]=C[i+1]   
                C[i+1]=t
                
        x=x+1                

    return C

def Diagonal_Nula(C,d,n):
    '''Funcion que verifica si algun coeficiente de la diagonal de una matriz es nula '''
    diagonal_nula=False
    for i in range (n):
        for j in range (d):
            if (i==j):
                if (C[i][j]==0):
                    diagonal_nula=True

    return diagonal_nula
